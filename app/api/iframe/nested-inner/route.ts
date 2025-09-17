import { NextResponse } from "next/server";

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Nested Inner IFrame</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 15px; 
            background: linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%);
            margin: 0;
            min-height: 100vh;
        }
        .container { 
            background: white; 
            padding: 20px; 
            border-radius: 10px;
            border: 3px solid #22c55e;
            box-shadow: 0 6px 20px rgba(34, 197, 94, 0.15);
        }
        input, button { 
            padding: 10px 12px; 
            margin: 6px 0; 
            border: 2px solid #86efac;
            border-radius: 6px;
            font-size: 13px;
            width: 100%;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: #22c55e;
            box-shadow: 0 0 0 3px rgba(34, 197, 94, 0.1);
        }
        button { 
            background: linear-gradient(135deg, #22c55e 0%, #16a34a 100%); 
            color: white; 
            border: none;
            cursor: pointer;
            font-weight: 600;
        }
        button:hover { 
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.3);
        }
        .deepest-iframe {
            margin-top: 15px;
            border: 3px solid #22c55e;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(34, 197, 94, 0.2);
        }
        h4, h5 {
            color: #15803d;
            margin-bottom: 12px;
            text-align: center;
        }
        p {
            color: #374151;
            text-align: center;
        }
        #level2-result {
            margin-top: 10px;
            padding: 10px;
            background: #dcfce7;
            border-radius: 6px;
            font-weight: 500;
        }
    </style>
</head>
<body>
    <div class="container">
        <h4>Nested IFrame - Level 2</h4>
        <p style="font-size: 12px;">This is the second level iframe</p>
        
        <input 
            type="text" 
            id="level2-input" 
            placeholder="Level 2 input"
            data-testid="nested-level2-input"
        />
        <button 
            onclick="updateLevel2()"
            data-testid="nested-level2-button"
        >
            Update Level 2
        </button>
        <div id="level2-result" data-testid="nested-level2-result"></div>
        
        <h5>Deepest IFrame (Level 3):</h5>
        <iframe 
            src="/api/iframe/nested-deepest"
            width="100%" 
            height="180"
            class="deepest-iframe"
            title="Deepest Nested IFrame"
            data-testid="nested-deepest-iframe"
        ></iframe>
    </div>

    <script>
        function updateLevel2() {
            const input = document.getElementById('level2-input').value;
            document.getElementById('level2-result').innerHTML = 
                '<strong>Level 2:</strong> ' + input;
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
