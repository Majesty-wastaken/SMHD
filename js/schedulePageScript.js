
        // Load tasks and table from localStorage when the page loads
        window.onload = function() {
            const savedTasks = JSON.parse(localStorage.getItem('tasks'));
            const savedTable = JSON.parse(localStorage.getItem('weeklyTable'));

            if (savedTasks) {
                savedTasks.forEach(task => {
                    addTaskToList(task);
                });
            }

            if (savedTable) {
                const rows = document.querySelectorAll('#weekly-table tbody tr');
                rows.forEach((row, index) => {
                    const taskCell = row.querySelector('td:nth-child(2)');
                    const timeCell = row.querySelector('td:nth-child(3)');
                    if (savedTable[index]) {
                        taskCell.textContent = savedTable[index].task;
                        timeCell.textContent = savedTable[index].time;
                    }
                });
            }
        };

        // Save tasks to localStorage
        function saveTasks() {
            const tasks = [];
            document.querySelectorAll('#task-list li').forEach(li => {
                tasks.push(li.textContent.trim());
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Save weekly table to localStorage
        function saveTable() {
            const tableData = [];
            document.querySelectorAll('#weekly-table tbody tr').forEach(row => {
                const task = row.querySelector('td:nth-child(2)').textContent.trim();
                const time = row.querySelector('td:nth-child(3)').textContent.trim();
                tableData.push({ task, time });
            });
            localStorage.setItem('weeklyTable', JSON.stringify(tableData));
        }

        // Handle adding tasks
        document.getElementById('add-task-btn').addEventListener('click', function() {
            const taskInput = document.getElementById('task-input');
            const taskText = taskInput.value.trim();

            if (taskText !== "") {
                addTaskToList(taskText);
                taskInput.value = '';
                saveTasks();
                showNotification('Task Added Successfully.');
            }
        });

        // Add task to list
        function addTaskToList(taskText) {
            const taskList = document.getElementById('task-list');

            const li = document.createElement('li');
            li.textContent = taskText;

            const deleteBtn = document.createElement('button');
            deleteBtn.innerHTML = '<i class="fa-solid fa-x"></i>';
            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(li);
                saveTasks();
            });

            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        }

        // Show Notification
        function showNotification(message) {
            if (Notification.permission === "granted") {
                new Notification(message);
            } else if (Notification.permission !== "denied") {
                Notification.requestPermission().then(permission => {
                    if (permission === "granted") {
                        new Notification(message);
                    }
                });
            }
        }

        // Save table data when any cell is edited
        document.querySelectorAll('#weekly-table td[contenteditable="true"]').forEach(cell => {
            cell.addEventListener('blur', function() {
                saveTable();
            });
        });
