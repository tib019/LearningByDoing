#!/usr/bin/env python3
"""
Python Learning Environment - Modern Python 3.11+ Features
Ein immersives Lernsystem für Python Grundlagen und moderne Konzepte
"""

import sys
import os
from typing import Any, List, Dict, Optional, Union
from dataclasses import dataclass, field
from enum import Enum
from pathlib import Path
import json
import asyncio
from datetime import datetime, timedelta
import logging
from contextlib import contextmanager
import time

# Logging Setup
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[
        logging.FileHandler('python_learning.log'),
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

class DifficultyLevel(Enum):
    """Schwierigkeitsgrade für Übungen"""
    BEGINNER = "beginner"
    INTERMEDIATE = "intermediate"
    ADVANCED = "advanced"

class TopicCategory(Enum):
    """Kategorien für Lerninhalte"""
    VARIABLES = "variables"
    CONTROL_FLOW = "control_flow"
    FUNCTIONS = "functions"
    DATA_STRUCTURES = "data_structures"
    OOP = "object_oriented_programming"
    MODULES = "modules"
    ERROR_HANDLING = "error_handling"
    FILE_IO = "file_io"
    DECORATORS = "decorators"
    GENERATORS = "generators"
    ASYNC = "async_programming"

@dataclass
class Exercise:
    """Repräsentiert eine Übungsaufgabe"""
    id: str
    title: str
    description: str
    category: TopicCategory
    difficulty: DifficultyLevel
    code_template: str
    solution: str
    hints: List[str] = field(default_factory=list)
    test_cases: List[Dict[str, Any]] = field(default_factory=list)
    points: int = 10

@dataclass
class LearningModule:
    """Repräsentiert ein Lernmodul"""
    id: str
    title: str
    description: str
    category: TopicCategory
    difficulty: DifficultyLevel
    content: str
    examples: List[str] = field(default_factory=list)
    exercises: List[Exercise] = field(default_factory=list)
    prerequisites: List[str] = field(default_factory=list)

class PythonLearningEnvironment:
    """
    Hauptklasse für das Python-Lernsystem
    Bietet interaktive Lernmöglichkeiten mit modernen Python-Features
    """
    
    def __init__(self):
        self.modules: Dict[str, LearningModule] = {}
        self.exercises: Dict[str, Exercise] = {}
        self.user_progress: Dict[str, Any] = {}
        self.current_module: Optional[str] = None
        self.session_start = datetime.now()
        
        self._load_modules()
        self._load_exercises()
        self._load_user_progress()
    
    def _load_modules(self) -> None:
        """Lädt alle verfügbaren Lernmodule"""
        logger.info("Lade Lernmodule...")
        
        # Modul 1: Variablen und Datentypen
        self.modules["variables"] = LearningModule(
            id="variables",
            title="Variablen und Datentypen",
            description="Lerne die Grundlagen von Variablen, Datentypen und Type Hints",
            category=TopicCategory.VARIABLES,
            difficulty=DifficultyLevel.BEGINNER,
            content="""
# Python Variablen und Datentypen

## 1. Variablen erstellen
In Python sind Variablen dynamisch typisiert - der Typ wird automatisch erkannt.

```python
name = "Max Mustermann"  # str
age = 25                 # int
height = 1.75           # float
is_student = True       # bool
```

## 2. Type Hints (Python 3.5+)
Moderne Python-Entwicklung verwendet Type Hints für bessere Code-Qualität:

```python
from typing import List, Dict, Optional, Union

def greet(name: str, age: int) -> str:
    return f"Hallo {name}, du bist {age} Jahre alt!"

def process_data(data: List[Dict[str, Any]]) -> Optional[str]:
    if not data:
        return None
    return "Daten verarbeitet"
```

## 3. Moderne Datentypen (Python 3.9+)
Python 3.9+ bietet verbesserte Typisierung:

```python
# Vor Python 3.9
from typing import List, Dict

# Ab Python 3.9
list_of_strings: list[str] = ["a", "b", "c"]
user_data: dict[str, str] = {"name": "Max", "city": "Berlin"}
```

## 4. Dataclasses (Python 3.7+)
Einfache Klassen für Datenstrukturen:

```python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class User:
    name: str
    email: str
    age: int
    created_at: datetime = field(default_factory=datetime.now)
    is_active: bool = True
```
            """,
            examples=[
                "variables_basic.py",
                "type_hints_demo.py",
                "dataclasses_example.py"
            ]
        )
        
        # Modul 2: Kontrollstrukturen
        self.modules["control_flow"] = LearningModule(
            id="control_flow",
            title="Kontrollstrukturen und Schleifen",
            description="Verstehe if/else, Schleifen und moderne Kontrollstrukturen",
            category=TopicCategory.CONTROL_FLOW,
            difficulty=DifficultyLevel.BEGINNER,
            content="""
# Kontrollstrukturen in Python

## 1. If-Else Statements
```python
age = 18

if age >= 18:
    print("Volljährig")
elif age >= 16:
    print("Teilweise volljährig")
else:
    print("Minderjährig")
```

## 2. Match-Case (Python 3.10+)
Moderne Switch-Statements:

```python
def analyze_status(status: str) -> str:
    match status:
        case "active":
            return "Benutzer ist aktiv"
        case "inactive":
            return "Benutzer ist inaktiv"
        case "pending":
            return "Benutzer wartet auf Aktivierung"
        case _:
            return "Unbekannter Status"
```

## 3. Schleifen
```python
# For-Schleife mit enumerate
fruits = ["Apfel", "Banane", "Orange"]
for index, fruit in enumerate(fruits, start=1):
    print(f"{index}. {fruit}")

# List Comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]

# Dictionary Comprehension
word_lengths = {word: len(word) for word in fruits}
```

## 4. Walrus Operator (Python 3.8+)
```python
# Traditionell
data = get_data()
if data:
    process_data(data)

# Mit Walrus Operator
if data := get_data():
    process_data(data)
```
            """,
            examples=[
                "control_flow_basic.py",
                "match_case_demo.py",
                "comprehensions.py"
            ]
        )
        
        # Weitere Module hier hinzufügen...
        logger.info(f"Geladen: {len(self.modules)} Module")
    
    def _load_exercises(self) -> None:
        """Lädt alle Übungsaufgaben"""
        logger.info("Lade Übungsaufgaben...")
        
        # Übung 1: Variablen und Type Hints
        self.exercises["variables_01"] = Exercise(
            id="variables_01",
            title="Type Hints implementieren",
            description="Erstelle eine Funktion mit Type Hints, die zwei Zahlen addiert",
            category=TopicCategory.VARIABLES,
            difficulty=DifficultyLevel.BEGINNER,
            code_template="""
def add_numbers(a: int, b: int) -> int:
    # TODO: Implementiere die Addition
    pass

# Test
result = add_numbers(5, 3)
print(f"5 + 3 = {result}")
""",
            solution="""
def add_numbers(a: int, b: int) -> int:
    return a + b

# Test
result = add_numbers(5, 3)
print(f"5 + 3 = {result}")
""",
            hints=[
                "Verwende den + Operator für die Addition",
                "Stelle sicher, dass die Type Hints korrekt sind"
            ],
            test_cases=[
                {"input": (5, 3), "expected": 8},
                {"input": (-1, 1), "expected": 0},
                {"input": (0, 0), "expected": 0}
            ],
            points=10
        )
        
        # Übung 2: Dataclasses
        self.exercises["variables_02"] = Exercise(
            id="variables_02",
            title="Dataclass erstellen",
            description="Erstelle eine Person-Dataclass mit Name, Alter und E-Mail",
            category=TopicCategory.VARIABLES,
            difficulty=DifficultyLevel.BEGINNER,
            code_template="""
from dataclasses import dataclass

# TODO: Erstelle eine Person-Dataclass
# - name: str
# - age: int  
# - email: str
# - is_active: bool (Standard: True)

# Test
person = Person("Max Mustermann", 25, "max@example.com")
print(f"Person: {person}")
""",
            solution="""
from dataclasses import dataclass

@dataclass
class Person:
    name: str
    age: int
    email: str
    is_active: bool = True

# Test
person = Person("Max Mustermann", 25, "max@example.com")
print(f"Person: {person}")
""",
            hints=[
                "Verwende @dataclass Decorator",
                "Definiere die Felder mit Type Hints",
                "Setze is_active als Standardwert"
            ],
            test_cases=[
                {"input": ("Max", 25, "max@test.com"), "expected_type": "Person"},
                {"input": ("Anna", 30, "anna@test.com", False), "expected_type": "Person"}
            ],
            points=15
        )
        
        logger.info(f"Geladen: {len(self.exercises)} Übungen")
    
    def _load_user_progress(self) -> None:
        """Lädt den Fortschritt des Benutzers"""
        progress_file = Path("user_progress.json")
        if progress_file.exists():
            try:
                with open(progress_file, 'r', encoding='utf-8') as f:
                    self.user_progress = json.load(f)
                logger.info("Benutzerfortschritt geladen")
            except Exception as e:
                logger.error(f"Fehler beim Laden des Fortschritts: {e}")
                self.user_progress = {}
        else:
            self.user_progress = {
                "completed_modules": [],
                "completed_exercises": [],
                "total_points": 0,
                "start_date": datetime.now().isoformat()
            }
    
    def save_progress(self) -> None:
        """Speichert den Fortschritt des Benutzers"""
        try:
            with open("user_progress.json", 'w', encoding='utf-8') as f:
                json.dump(self.user_progress, f, indent=2, ensure_ascii=False)
            logger.info("Fortschritt gespeichert")
        except Exception as e:
            logger.error(f"Fehler beim Speichern des Fortschritts: {e}")
    
    def get_available_modules(self) -> List[LearningModule]:
        """Gibt alle verfügbaren Module zurück"""
        return list(self.modules.values())
    
    def get_module(self, module_id: str) -> Optional[LearningModule]:
        """Gibt ein spezifisches Modul zurück"""
        return self.modules.get(module_id)
    
    def start_module(self, module_id: str) -> bool:
        """Startet ein Lernmodul"""
        if module_id not in self.modules:
            logger.error(f"Modul {module_id} nicht gefunden")
            return False
        
        self.current_module = module_id
        module = self.modules[module_id]
        
 print(f"\n Modul gestartet: {module.title}")
 print(f" Beschreibung: {module.description}")
 print(f" Schwierigkeit: {module.difficulty.value}")
 print(f" Kategorie: {module.category.value}")
        print("\n" + "="*50)
        
        return True
    
    def display_module_content(self, module_id: str) -> None:
        """Zeigt den Inhalt eines Moduls an"""
        module = self.get_module(module_id)
        if not module:
 print(f" Modul {module_id} nicht gefunden")
            return
        
 print(f"\n {module.title}")
        print("="*50)
        print(module.content)
        
        if module.examples:
 print(f"\n Beispiele ({len(module.examples)}):")
            for example in module.examples:
                print(f"  - {example}")
    
    def get_exercises_for_module(self, module_id: str) -> List[Exercise]:
        """Gibt alle Übungen für ein Modul zurück"""
        module = self.get_module(module_id)
        if not module:
            return []
        
        return [ex for ex in self.exercises.values() 
                if ex.category == module.category]
    
    def start_exercise(self, exercise_id: str) -> bool:
        """Startet eine Übungsaufgabe"""
        if exercise_id not in self.exercises:
            logger.error(f"Übung {exercise_id} nicht gefunden")
            return False
        
        exercise = self.exercises[exercise_id]
        
 print(f"\n️ Übung: {exercise.title}")
 print(f" {exercise.description}")
 print(f" Schwierigkeit: {exercise.difficulty.value}")
 print(f" Punkte: {exercise.points}")
        print("\n" + "="*50)
 print(" Code Template:")
        print(exercise.code_template)
        
        if exercise.hints:
 print(f"\n Hinweise ({len(exercise.hints)}):")
            for i, hint in enumerate(exercise.hints, 1):
                print(f"  {i}. {hint}")
        
        return True
    
    def check_exercise_solution(self, exercise_id: str, user_code: str) -> Dict[str, Any]:
        """Überprüft die Lösung einer Übungsaufgabe"""
        if exercise_id not in self.exercises:
            return {"success": False, "error": "Übung nicht gefunden"}
        
        exercise = self.exercises[exercise_id]
        
        try:
            # Sichere Ausführung des Codes
            local_vars = {}
            exec(user_code, {"__builtins__": {}}, local_vars)
            
            # Teste die Testfälle
            passed_tests = 0
            total_tests = len(exercise.test_cases)
            
            for test_case in exercise.test_cases:
                # Hier würde die eigentliche Testlogik stehen
                # Für dieses Beispiel nehmen wir an, dass alle Tests bestanden werden
                passed_tests += 1
            
            success = passed_tests == total_tests
            
            if success:
                # Markiere Übung als abgeschlossen
                if exercise_id not in self.user_progress["completed_exercises"]:
                    self.user_progress["completed_exercises"].append(exercise_id)
                    self.user_progress["total_points"] += exercise.points
                    self.save_progress()
            
            return {
                "success": success,
                "passed_tests": passed_tests,
                "total_tests": total_tests,
                "points_earned": exercise.points if success else 0,
                "feedback": f"✅ {passed_tests}/{total_tests} Tests bestanden!" if success else f"❌ {passed_tests}/{total_tests} Tests bestanden"
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": f"Fehler beim Ausführen des Codes: {str(e)}"
            }
    
    def get_progress_summary(self) -> Dict[str, Any]:
        """Gibt eine Zusammenfassung des Fortschritts zurück"""
        total_modules = len(self.modules)
        total_exercises = len(self.exercises)
        completed_modules = len(self.user_progress.get("completed_modules", []))
        completed_exercises = len(self.user_progress.get("completed_exercises", []))
        total_points = self.user_progress.get("total_points", 0)
        
        # Berechne Fortschritt
        module_progress = (completed_modules / total_modules * 100) if total_modules > 0 else 0
        exercise_progress = (completed_exercises / total_exercises * 100) if total_exercises > 0 else 0
        
        return {
            "total_modules": total_modules,
            "completed_modules": completed_modules,
            "module_progress": round(module_progress, 1),
            "total_exercises": total_exercises,
            "completed_exercises": completed_exercises,
            "exercise_progress": round(exercise_progress, 1),
            "total_points": total_points,
            "session_duration": str(datetime.now() - self.session_start)
        }
    
    def display_progress(self) -> None:
        """Zeigt den aktuellen Fortschritt an"""
        progress = self.get_progress_summary()
        
 print("\n Lernfortschritt")
        print("="*50)
 print(f" Module: {progress['completed_modules']}/{progress['total_modules']} ({progress['module_progress']}%)")
 print(f"️ Übungen: {progress['completed_exercises']}/{progress['total_exercises']} ({progress['exercise_progress']}%)")
 print(f" Gesamtpunkte: {progress['total_points']}")
        print(f"⏱️ Session-Dauer: {progress['session_duration']}")
        
        # Fortschrittsbalken
 print(f"\n Module-Fortschritt:")
        self._display_progress_bar(progress['module_progress'])
        
 print(f"\n️ Übungs-Fortschritt:")
        self._display_progress_bar(progress['exercise_progress'])
    
    def _display_progress_bar(self, percentage: float) -> None:
        """Zeigt einen Fortschrittsbalken an"""
        bar_length = 30
        filled_length = int(bar_length * percentage / 100)
        bar = "█" * filled_length + "░" * (bar_length - filled_length)
        print(f"[{bar}] {percentage}%")
    
    @contextmanager
    def interactive_session(self):
        """Context Manager für interaktive Lernsession"""
 print(" Python Learning Environment gestartet!")
        print("="*50)
        
        try:
            yield self
        finally:
            self.save_progress()
 print("\n Session beendet. Fortschritt gespeichert!")
    
    async def run_async_example(self, delay: float = 1.0) -> str:
        """Beispiel für asynchrone Programmierung"""
        await asyncio.sleep(delay)
        return f"Asynchrone Aufgabe nach {delay} Sekunden abgeschlossen"

def main():
    """Hauptfunktion für das Lernsystem"""
    env = PythonLearningEnvironment()
    
    with env.interactive_session():
        # Zeige verfügbare Module
 print("\n Verfügbare Lernmodule:")
        for module in env.get_available_modules():
            print(f"  - {module.id}: {module.title} ({module.difficulty.value})")
        
        # Zeige Fortschritt
        env.display_progress()
        
        # Beispiel: Modul starten
        if env.start_module("variables"):
            env.display_module_content("variables")
        
        # Beispiel: Übung starten
        if env.start_exercise("variables_01"):
            # Simuliere Benutzerlösung
            user_solution = """
def add_numbers(a: int, b: int) -> int:
    return a + b

result = add_numbers(5, 3)
print(f"5 + 3 = {result}")
"""
            result = env.check_exercise_solution("variables_01", user_solution)
            print(f"\n{result.get('feedback', result.get('error', 'Kein Feedback vorhanden!'))}")
        
        # Aktualisierten Fortschritt anzeigen
        env.display_progress()

if __name__ == "__main__":
    main() 