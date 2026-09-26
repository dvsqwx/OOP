import tkinter as tk
from tkinter import ttk
from utils import BaseDialog

GROUPS = ["IM-o51", "IM-51", "IM-52", "IM-53", "IM-54", "IM-55"]


class GroupSelectDialog(BaseDialog):
    def __init__(self, parent):
        super().__init__(parent, "Вибір групи", "300x260")

        self.listbox = tk.Listbox(self, exportselection=False)
        for group in GROUPS:
            self.listbox.insert(tk.END, group)
        self.listbox.selection_set(0)
        self.listbox.pack(fill=tk.BOTH, expand=True, padx=10, pady=10)

        btn_frame = ttk.Frame(self)
        btn_frame.pack(side=tk.BOTTOM, pady=10)

        btn_ok = ttk.Button(btn_frame, text="Так", command=self.on_ok)
        btn_ok.pack(side=tk.LEFT, padx=5)

        btn_cancel = ttk.Button(btn_frame, text="Відміна", command=self.destroy)
        btn_cancel.pack(side=tk.LEFT, padx=5)

    def on_ok(self):
        selection = self.listbox.curselection()
        if selection:
            group = self.listbox.get(selection[0])
            self.parent.set_text(f"module 2: група {group}")
        self.destroy()
    
