import { NextResponse } from "next/server";

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Todo List IFrame</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 15px; 
            background: #f9fafb;
            margin: 0;
            box-sizing: border-box;
            min-height: 100vh;
        }
        .todo-container { 
            background: white; 
            padding: 20px; 
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
            max-width: 400px;
            width: 100%;
            box-sizing: border-box;
            margin: 0 auto;
        }
        .todo-input {
            width: 100%;
            padding: 10px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
            margin-bottom: 10px;
            box-sizing: border-box;
        }
        .add-btn {
            width: 100%;
            padding: 10px;
            background: #10b981;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-bottom: 15px;
        }
        .add-btn:hover {
            background: #059669;
        }
        .todo-item {
            display: flex;
            align-items: center;
            padding: 8px;
            border: 1px solid #e5e7eb;
            border-radius: 4px;
            margin-bottom: 5px;
            background: #f9fafb;
        }
        .todo-item.completed {
            text-decoration: line-through;
            opacity: 0.6;
        }
        .todo-checkbox {
            margin-right: 10px;
        }
        .todo-text {
            flex: 1;
        }
        .delete-btn {
            background: #ef4444;
            color: white;
            border: none;
            border-radius: 3px;
            padding: 4px 8px;
            cursor: pointer;
            font-size: 12px;
        }
        .delete-btn:hover {
            background: #dc2626;
        }
    </style>
</head>
<body>
    <div class="todo-container">
        <h3>Todo List IFrame</h3>
        <input 
            type="text" 
            id="todo-input" 
            class="todo-input"
            placeholder="Add a new todo..."
            data-testid="todo-input"
        />
        <button 
            onclick="addTodo()" 
            class="add-btn"
            data-testid="todo-add-button"
        >
            Add Todo
        </button>
        <div id="todo-list" data-testid="todo-list">
            <!-- Todos will be added here -->
        </div>
        <div style="margin-top: 15px; font-size: 14px; color: #6b7280;">
            <span id="todo-count" data-testid="todo-count">0</span> items total
        </div>
    </div>

    <script>
        let todos = [];
        let todoIdCounter = 1;
        
        function addTodo() {
            const input = document.getElementById('todo-input');
            const text = input.value.trim();
            
            if (text) {
                todos.push({
                    id: todoIdCounter++,
                    text: text,
                    completed: false
                });
                input.value = '';
                renderTodos();
            }
        }
        
        function toggleTodo(id) {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                todo.completed = !todo.completed;
                renderTodos();
            }
        }
        
        function deleteTodo(id) {
            todos = todos.filter(t => t.id !== id);
            renderTodos();
        }
        
        function renderTodos() {
            const todoList = document.getElementById('todo-list');
            const todoCount = document.getElementById('todo-count');
            
            todoList.innerHTML = '';
            
            todos.forEach(todo => {
                const todoItem = document.createElement('div');
                todoItem.className = 'todo-item' + (todo.completed ? ' completed' : '');
                todoItem.innerHTML = \`
                    <input 
                        type="checkbox" 
                        class="todo-checkbox"
                        \${todo.completed ? 'checked' : ''}
                        onchange="toggleTodo(\${todo.id})"
                        data-testid="todo-checkbox-\${todo.id}"
                    />
                    <span class="todo-text" data-testid="todo-text-\${todo.id}">\${todo.text}</span>
                    <button 
                        class="delete-btn" 
                        onclick="deleteTodo(\${todo.id})"
                        data-testid="todo-delete-\${todo.id}"
                    >
                        Delete
                    </button>
                \`;
                todoList.appendChild(todoItem);
            });
            
            todoCount.textContent = todos.length;
        }
        
        // Allow Enter key to add todo
        document.getElementById('todo-input').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTodo();
            }
        });
        
        // Initialize with sample todos
        todos = [
            { id: todoIdCounter++, text: 'Learn Selenium WebDriver', completed: false },
            { id: todoIdCounter++, text: 'Practice iframe testing', completed: true }
        ];
        renderTodos();
    </script>
</body>
</html>
  `;

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/html",
    },
  });
}
