import tkinter as tk


class BaseDialog(tk.Toplevel):
    def __init__(self, parent, title, geometry="300x150"):
        super().__init__(parent)
        self.parent = parent
        self.title(title)
        self.geometry(geometry)
        self.resizable(False, False)

        self.transient(parent)
        self.grab_set()