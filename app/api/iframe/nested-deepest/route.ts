import { NextResponse } from "next/server";

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <title>Deepest Nested IFrame</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 12px; 
            background: linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%);
            margin: 0;
            min-height: 100vh;
        }
        .container { 
            background: white; 
            padding: 15px; 
            border-radius: 8px;
            border: 3px solid #ec4899;
            box-shadow: 0 4px 15px rgba(236, 72, 153, 0.15);
        }
        input, button { 
            padding: 8px 10px; 
            margin: 5px 0; 
            border: 2px solid #f9a8d4;
            border-radius: 6px;
            font-size: 12px;
            width: 100%;
            box-sizing: border-box;
        }
        input:focus {
            outline: none;
            border-color: #ec4899;
            box-shadow: 0 0 0 3px rgba(236, 72, 153, 0.1);
        }
        button { 
            background: linear-gradient(135deg, #ec4899 0%, #db2777 100%); 
            color: white; 
            border: none;
            cursor: pointer;
            font-weight: 600;
        }
        button:hover { 
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
        }
        h5 {
            margin: 8px 0;
            font-size: 14px;
            color: #be185d;
            text-align: center;
        }
        p {
            font-size: 12px;
            margin: 6px 0;
            color: #374151;
            text-align: center;
        }
        #level3-result {
            font-size: 11px;
            margin-top: 8px;
            padding: 8px;
            background: #fce7f3;
            border-radius: 4px;
            font-weight: 500;
        }
        label {
            font-size: 11px;
            display: flex;
            align-items: center;
            margin: 6px 0;
            color: #374151;
        }
        input[type="radio"] {
            width: auto;
            margin-right: 6px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h5>Deepest IFrame - Level 3</h5>
        <p>This is the deepest nested iframe</p>
        
        <input 
            type="text" 
            id="level3-input" 
            placeholder="Level 3 input"
            data-testid="nested-level3-input"
        />
        <button 
            onclick="updateLevel3()"
            data-testid="nested-level3-button"
        >
            Update Level 3
        </button>
        <div id="level3-result" data-testid="nested-level3-result"></div>
        
        <div style="margin-top: 8px;">
            <label style="font-size: 10px;">
                <input 
                    type="radio" 
                    name="deepest" 
                    value="option1"
                    data-testid="nested-level3-radio1"
                /> 
                Deep Option 1
            </label><br>
            <label style="font-size: 10px;">
                <input 
                    type="radio" 
                    name="deepest" 
                    value="option2"
                    data-testid="nested-level3-radio2"
                /> 
                Deep Option 2
            </label>
        </div>
    </div>

    <script>
        function updateLevel3() {
            const input = document.getElementById('level3-input').value;
            document.getElementById('level3-result').innerHTML = 
                '<strong>Level 3:</strong> ' + input;
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
