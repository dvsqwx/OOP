import tkinter as tk
from utils import make_dialog, add_buttons

__all__ = ["open_dialog"]

class _FirstDialog:
    def __init__(self, parent, on_next):
        self._on_next = on_next
        self._win = make_dialog(parent, "робота 1 - Крок 1", 320, 130)
        tk.Label(self._win, text="Перше вікно діалогу.").pack(pady=20)
        add_buttons(self._win, ("Далі >", self._next), ("Відміна", self._win.destroy))

    def _next(self):
        self._win.destroy()
        self._on_next()

def open_dialog(parent, on_next):
    _FirstDialog(parent, on_next)