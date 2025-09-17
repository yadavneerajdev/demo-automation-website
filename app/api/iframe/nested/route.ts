import { NextResponse } from "next/server";

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nested IFrame</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 20px; 
            background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
            margin: 0;
            min-height: 100vh;
            box-sizing: border-box;
        }
        .container { 
            background: white; 
            padding: 25px; 
            border-radius: 12px;
            border: 3px solid #f59e0b;
            box-shadow: 0 8px 25px rgba(245, 158, 11, 0.15);
            width: 100%;
            box-sizing: border-box;
            margin: 0 auto;
        }
        input, button { 
            padding: 12px 16px; 
            margin: 8px 0; 
            border: 2px solid #fbbf24;
            border-radius: 8px;
            font-size: 14px;
            width: 100%;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: #f59e0b;
            box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1);
        }
        button { 
            background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); 
            color: white; 
            border: none;
            cursor: pointer;
            font-weight: 600;
        }
        button:hover { 
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        .nested-iframe {
            margin-top: 20px;
            border: 3px solid #f59e0b;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2);
        }
        h3, h4 {
            color: #92400e;
            margin-bottom: 15px;
            text-align: center;
        }
        #level1-result {
            margin-top: 10px;
            padding: 12px;
            background: #fef3c7;
            border-radius: 6px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <h3>Nested IFrame - Level 1</h3>
        <p>This is the first level iframe</p>
        
        <input 
            type="text" 
            id="level1-input" 
            placeholder="Level 1 input"
            data-testid="nested-level1-input"
        />
        <button 
            onclick="updateLevel1()"
            data-testid="nested-level1-button"
        >
            Update Level 1
        </button>
        <div id="level1-result" data-testid="nested-level1-result"></div>
        
        <h4>Nested IFrame (Level 2):</h4>
        <iframe 
            src="/api/iframe/nested-inner"
            width="100%" 
            height="280"
            class="nested-iframe"
            title="Nested Inner IFrame"
            data-testid="nested-inner-iframe"
        ></iframe>
    </div>

    <script>
        function updateLevel1() {
            const input = document.getElementById('level1-input').value;
            document.getElementById('level1-result').innerHTML = 
                '<strong>Level 1:</strong> ' + input;
        }
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
