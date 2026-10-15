import tkinter as tk


def make_dialog(parent, title, width, height):
    win = tk.Toplevel(parent)
    win.title(title)
    win.resizable(False, False)
    win.transient(parent)
    parent.update_idletasks()
    x = parent.winfo_rootx() + (parent.winfo_width() - width) // 2
    y = parent.winfo_rooty() + (parent.winfo_height() - height) // 2
    win.geometry(f"{width}x{height}+{max(x, 0)}+{max(y, 0)}")
    win.wait_visibility()
    win.grab_set()
    return win

def add_buttons(win, *buttons):
    row = tk.Frame(win)
    row.pack(side="bottom", pady=12)
    for text, command in buttons:
        tk.Button(row, text=text, width=10, command=command).pack(side="left", padx=5)