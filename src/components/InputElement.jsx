export default function InputElement({ selectedinput, setSelectedinput }) {

    const handleCheckboxChange = (inputCheckBox) => {
        const element = inputCheckBox.target;
        const { checked, id } = element
        checked ? setSelectedinput((prev) => [...prev, id]) : setSelectedinput((prev) => prev.filter((el) => el !== id))
    };

    return (
        <section>
            <h1>Home</h1>
            <div className="input-group flex gap-2">
                <label htmlFor="yamaha">Yamaha</label>
                <input type="checkbox" id="yamaha" onChange={handleCheckboxChange} />
            </div>
            <div className="input-group flex gap-2">
                <label htmlFor="marantz">Marantz</label>
                <input type="checkbox" id="marantz" onChange={handleCheckboxChange} />
            </div>
        </section>

    );
}