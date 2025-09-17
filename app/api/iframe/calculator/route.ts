import { NextResponse } from "next/server";

export async function GET() {
  const html = `
<!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calculator IFrame</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            padding: 20px; 
            background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
            margin: 0;
            min-height: 100vh;
            display: flex;
            align-items: flex-start;
            justify-content: center;
            box-sizing: border-box;
        }
        .calculator { 
            background: white; 
            padding: 25px; 
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.15);
            max-width: 320px;
            width: 100%;
            border: 1px solid #e5e7eb;
        }
        .display {
            width: 100%;
            height: 60px;
            font-size: 24px;
            font-weight: 600;
            text-align: right;
            padding: 0 15px;
            margin-bottom: 20px;
            border: 2px solid #d1d5db;
            border-radius: 8px;
            box-sizing: border-box;
            background: #f9fafb;
            color: #1f2937;
        }
        .buttons {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        button {
            height: 55px;
            font-size: 20px;
            font-weight: 600;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            background: #f3f4f6;
            transition: all 0.2s;
            color: #374151;
        }
        button:hover {
            background: #e5e7eb;
            transform: translateY(-1px);
        }
        .operator {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%) !important;
            color: white !important;
        }
        .operator:hover {
            background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important;
            box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .equals {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%) !important;
            color: white !important;
        }
        .equals:hover {
            background: linear-gradient(135deg, #059669 0%, #047857 100%) !important;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
        }
        h3 {
            text-align: center;
            color: #1f2937;
            margin-bottom: 20px;
            font-size: 20px;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <h3>Calculator IFrame</h3>
        <input 
            type="text" 
            id="calc-display" 
            class="display" 
            readonly
            data-testid="calculator-display"
        />
        <div class="buttons">
            <button onclick="clearCalc()" data-testid="calc-clear">C</button>
            <button onclick="appendToDisplay('/')" class="operator" data-testid="calc-divide">÷</button>
            <button onclick="appendToDisplay('*')" class="operator" data-testid="calc-multiply">×</button>
            <button onclick="deleteLast()" data-testid="calc-delete">⌫</button>
            
            <button onclick="appendToDisplay('7')" data-testid="calc-7">7</button>
            <button onclick="appendToDisplay('8')" data-testid="calc-8">8</button>
            <button onclick="appendToDisplay('9')" data-testid="calc-9">9</button>
            <button onclick="appendToDisplay('-')" class="operator" data-testid="calc-subtract">-</button>
            
            <button onclick="appendToDisplay('4')" data-testid="calc-4">4</button>
            <button onclick="appendToDisplay('5')" data-testid="calc-5">5</button>
            <button onclick="appendToDisplay('6')" data-testid="calc-6">6</button>
            <button onclick="appendToDisplay('+')" class="operator" data-testid="calc-add">+</button>
            
            <button onclick="appendToDisplay('1')" data-testid="calc-1">1</button>
            <button onclick="appendToDisplay('2')" data-testid="calc-2">2</button>
            <button onclick="appendToDisplay('3')" data-testid="calc-3">3</button>
            <button onclick="calculate()" class="equals" rowspan="2" data-testid="calc-equals">=</button>
            
            <button onclick="appendToDisplay('0')" style="grid-column: span 2;" data-testid="calc-0">0</button>
            <button onclick="appendToDisplay('.')" data-testid="calc-decimal">.</button>
        </div>
    </div>

    <script>
        let display = document.getElementById('calc-display');
        
        function appendToDisplay(value) {
            display.value += value;
        }
        
        function clearCalc() {
            display.value = '';
        }
        
        function deleteLast() {
            display.value = display.value.slice(0, -1);
        }
        
        function calculate() {
            try {
                // Replace display symbols with actual operators
                let expression = display.value.replace(/×/g, '*').replace(/÷/g, '/');
                display.value = eval(expression);
            } catch (error) {
                display.value = 'Error';
            }
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
