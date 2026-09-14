"""Tests fuer die Loesungspruefung der Python-Lernumgebung.

Vor dieser Suite hatte das Repository keine Tests; npm test meldete
"No tests found". Die geprueften Faelle decken genau die beiden Fehler ab, die
die Pruefung vorher wertlos machten: sie zaehlte jeden Testfall blind als
bestanden, und sie fuehrte den Lerncode ohne builtins aus, sodass normale
Loesungen gar nicht laufen konnten.
"""
import importlib.util
import os
import pathlib

import pytest

MODUL = (
    pathlib.Path(__file__).resolve().parents[1]
    / "LEARNING-SYSTEM"
    / "python-modules"
    / "01-python-basics"
    / "learning_environment.py"
)


@pytest.fixture()
def env(tmp_path, monkeypatch):
    """Lernumgebung mit Fortschrittsdatei in einem temporaeren Verzeichnis."""
    monkeypatch.chdir(tmp_path)
    spec = importlib.util.spec_from_file_location("learning_environment", MODUL)
    modul = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modul)
    klasse = next(
        v for v in vars(modul).values()
        if isinstance(v, type) and hasattr(v, "check_exercise_solution")
    )
    return klasse()


RICHTIG = "def add_numbers(a: int, b: int) -> int:\n    return a + b\n"
FALSCH = "def add_numbers(a: int, b: int) -> int:\n    return a - b\n"


class TestKorrekteLoesung:
    def test_richtige_loesung_besteht_alle_testfaelle(self, env):
        ergebnis = env.check_exercise_solution("variables_01", RICHTIG)

        assert ergebnis["success"] is True
        assert ergebnis["passed_tests"] == ergebnis["total_tests"]
        assert ergebnis["failures"] == []

    def test_builtins_stehen_dem_lerncode_zur_verfuegung(self, env):
        # Die Vorgaengerfassung fuehrte mit {"__builtins__": {}} aus — print,
        # len und range waren damit nicht verfuegbar, obwohl die Aufgaben sie
        # ausdruecklich verwenden.
        code = (
            "def add_numbers(a, b):\n"
            "    print('Zwischenstand:', a, b)\n"
            "    return sum(range(0)) + a + b\n"
        )
        assert env.check_exercise_solution("variables_01", code)["success"] is True

    def test_punkte_werden_nur_einmal_gutgeschrieben(self, env):
        erstes = env.check_exercise_solution("variables_01", RICHTIG)
        punkte_nach_erstem = env.user_progress["total_points"]

        env.check_exercise_solution("variables_01", RICHTIG)

        assert erstes["points_earned"] > 0
        assert env.user_progress["total_points"] == punkte_nach_erstem


class TestFehlerhafteLoesung:
    def test_falsche_loesung_faellt_durch_und_nennt_den_grund(self, env):
        ergebnis = env.check_exercise_solution("variables_01", FALSCH)

        assert ergebnis["success"] is False
        assert ergebnis["passed_tests"] < ergebnis["total_tests"]
        assert any("erwartet" in grund for grund in ergebnis["failures"])

    def test_ausnahme_im_lerncode_wird_als_fehlschlag_gemeldet(self, env):
        code = "def add_numbers(a, b):\n    return 1 / 0\n"
        ergebnis = env.check_exercise_solution("variables_01", code)

        assert ergebnis["success"] is False
        assert all("ZeroDivisionError" in grund for grund in ergebnis["failures"])

    def test_endlosschleife_wird_nach_dem_zeitlimit_abgebrochen(self, env):
        code = "def add_numbers(a, b):\n    while True:\n        pass\n"
        ergebnis = env.check_exercise_solution("variables_01", code)

        assert ergebnis["success"] is False
        assert "abgebrochen" in ergebnis["error"]

    def test_code_ohne_definition_wird_abgelehnt(self, env):
        ergebnis = env.check_exercise_solution("variables_01", "x = 1\n")

        assert ergebnis["success"] is False
        assert "error" in ergebnis

    def test_unbekannte_uebung_wird_abgelehnt(self, env):
        ergebnis = env.check_exercise_solution("gibt-es-nicht", RICHTIG)

        assert ergebnis["success"] is False
        assert ergebnis["error"] == "Übung nicht gefunden"

    def test_syntaxfehler_wird_als_fehler_gemeldet_nicht_als_erfolg(self, env):
        ergebnis = env.check_exercise_solution("variables_01", "def add_numbers(\n")

        assert ergebnis["success"] is False
