interface Props{
    repos: Array<string>
}

export default function Table({repos}: Props) {

    const headings = ['Repository Name', 'Author', 'Description']

    return (
        <table className="m-auto p-4 text-left border-collapse">
            <thead>
                <tr className="pr-0">
                    {headings.map((item: string, idx) => {
                        return <th key={idx} className="font-bold text-center" title={item}>{item}</th>;
                    })}
                </tr>
                {repos.map((arr, i) => {
                    return (
                        <tr key={i} className="pr-0">
                            {arr.map((element, idx) => (
                                <td key={idx} className="text-center p-4">{element}</td>
                            ))}
                        </tr>
                    );
                })}
            </thead>
        </table>
    );
}