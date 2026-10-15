import tkinter as tk
from utils import make_dialog, add_buttons

__all__ = ["open_dialog"]


class _SecondDialog:
    def __init__(self, parent, on_back, on_yes):
        self._on_back = on_back
        self._on_yes = on_yes
        self._win = make_dialog(parent, "робота 1 - Крок 2", 360, 130)
        tk.Label(self._win, text="Друге вікно діалогу.").pack(pady=20)
        add_buttons(self._win, ("< Назад", self._back), ("Так", self._yes),
                    ("Відміна", self._win.destroy))

    def _back(self):
        self._win.destroy()
        self._on_back()

    def _yes(self):
        self._win.destroy()
        self._on_yes()


def open_dialog(parent, on_back, on_yes):
    _SecondDialog(parent, on_back, on_yes)