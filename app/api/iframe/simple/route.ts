import { NextResponse } from "next/server";

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Simple IFrame</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 20px; 
            background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
            margin: 0;
            min-height: 100vh;
            box-sizing: border-box;
        }
        .container { 
            max-width: 500px; 
            width: 100%;
            background: white; 
            padding: 25px; 
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.06);
            border: 1px solid #e5e7eb;
            box-sizing: border-box;
            margin: 0 auto;
        }
        input, button, select { 
            width: 100%; 
            padding: 12px 16px; 
            margin: 8px 0; 
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 14px;
            transition: all 0.2s;
        }
        input:focus, select:focus {
            outline: none;
            border-color: #3b82f6;
            box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
        }
        button { 
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); 
            color: white; 
            border: none;
            cursor: pointer;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
        button:hover { 
            transform: translateY(-1px);
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .result {
            margin-top: 15px;
            padding: 15px;
            background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
            border: 2px solid #bae6fd;
            border-radius: 8px;
            font-weight: 500;
        }
        h3 {
            color: #1f2937;
            margin-bottom: 20px;
            font-size: 24px;
            text-align: center;
        }
        label {
            display: flex;
            align-items: center;
            margin: 12px 0;
            font-weight: 500;
            color: #374151;
        }
        input[type="checkbox"] {
            width: auto;
            margin-right: 8px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h3>Simple IFrame Form</h3>
        <form id="simpleForm">
            <input 
                type="text" 
                id="iframe-name" 
                placeholder="Enter your name"
                data-testid="iframe-simple-name"
            />
            <input 
                type="email" 
                id="iframe-email" 
                placeholder="Enter your email"
                data-testid="iframe-simple-email"
            />
            <button 
                type="submit"
                data-testid="iframe-simple-submit"
            >
                Submit in IFrame
            </button>
        </form>
        <div id="result" class="result" style="display:none;" data-testid="iframe-simple-result">
            <strong>Form submitted!</strong><br>
            <span id="result-text"></span>
        </div>
        <div style="margin-top: 15px;">
            <label>
                <input 
                    type="checkbox" 
                    id="iframe-checkbox"
                    data-testid="iframe-simple-checkbox"
                /> 
                I agree to the terms
            </label>
        </div>
        <div style="margin-top: 10px;">
            <select id="iframe-select" data-testid="iframe-simple-select">
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </select>
        </div>
    </div>

    <script>
        document.getElementById('simpleForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('iframe-name').value;
            const email = document.getElementById('iframe-email').value;
            
            document.getElementById('result-text').innerHTML = 
                'Name: ' + name + '<br>Email: ' + email;
            document.getElementById('result').style.display = 'block';
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
