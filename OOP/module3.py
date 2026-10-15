import tkinter as tk
from utils import make_dialog, add_buttons

__all__ = ["open_dialog"]

GROUPS = ["IM-o51", "IM-51", "IM-52", "IM-53", "IM-54", "IM-55"]

class _GroupDialog:
    def __init__(self, parent, on_result):
        self._on_result = on_result
        self._win = make_dialog(parent, "робота 2", 300, 280)
        tk.Label(self._win, text="Оберіть групу:").pack(pady=(12, 0))
        add_buttons(self._win, ("Так", self._yes), ("Відміна", self._win.destroy))
        self._list = tk.Listbox(self._win, exportselection=False)
        self._list.insert(tk.END, *GROUPS)
        self._list.pack(fill="both", expand=True, padx=20, pady=8)

    def _yes(self):
        selected = self._list.curselection()
        if selected:
            group = self._list.get(selected[0])
            self._win.destroy()
            self._on_result(group)


def open_dialog(parent, on_result):
    _GroupDialog(parent, on_result)