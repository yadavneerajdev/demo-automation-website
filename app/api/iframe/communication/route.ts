import { NextResponse } from "next/server";

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Communication IFrame</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            padding: 15px; 
            background: #fef2f2;
            margin: 0;
            box-sizing: border-box;
            min-height: 100vh;
        }
        .container { 
            background: white; 
            padding: 20px; 
            border-radius: 8px;
            border: 2px solid #ef4444;
            width: 100%;
            max-width: 500px;
            box-sizing: border-box;
            margin: 0 auto;
        }
        input, button { 
            padding: 8px 12px; 
            margin: 5px 0; 
            border: 1px solid #d1d5db;
            border-radius: 4px;
            width: 100%;
            box-sizing: border-box;
        }
        button { 
            background: #ef4444; 
            color: white; 
            border: none;
            cursor: pointer;
        }
        button:hover { 
            background: #dc2626; 
        }
        .message-display {
            margin-top: 10px;
            padding: 10px;
            background: #fef2f2;
            border: 1px solid #fecaca;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h3>Communication IFrame</h3>
        <p>Send message to parent window:</p>
        
        <input 
            type="text" 
            id="message-input" 
            placeholder="Type message to send to parent..."
            data-testid="communication-input"
        />
        <button 
            onclick="sendMessageToParent()"
            data-testid="communication-send-button"
        >
            Send Message to Parent
        </button>
        
        <div class="message-display">
            <strong>Messages from parent:</strong>
            <div id="parent-messages" data-testid="parent-messages">
                No messages received yet
            </div>
        </div>
        
        <div style="margin-top: 15px;">
            <button 
                onclick="requestDataFromParent()"
                data-testid="communication-request-data"
            >
                Request Data from Parent
            </button>
        </div>
    </div>

    <script>
        function sendMessageToParent() {
            const input = document.getElementById('message-input');
            const message = input.value.trim();
            
            if (message) {
                // Send message to parent window
                window.parent.postMessage({
                    type: 'iframe-message',
                    message: message,
                    timestamp: new Date().toLocaleTimeString()
                }, '*');
                
                input.value = '';
                
                // Update display in iframe
                const display = document.getElementById('parent-messages');
                display.innerHTML = 'Message sent: "' + message + '" at ' + new Date().toLocaleTimeString();
            }
        }
        
        function requestDataFromParent() {
            window.parent.postMessage({
                type: 'request-data',
                timestamp: new Date().toLocaleTimeString()
            }, '*');
        }
        
        // Listen for messages from parent
        window.addEventListener('message', function(event) {
            if (event.data.type === 'parent-response') {
                const display = document.getElementById('parent-messages');
                display.innerHTML = 'Received from parent: "' + event.data.message + '" at ' + event.data.timestamp;
            }
        });
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
