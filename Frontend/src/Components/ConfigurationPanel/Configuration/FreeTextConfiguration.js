import React, {useState} from 'react';

const FreeTextConfiguration = ({onSave}) => {
    const [texts, setTexts] = useState(Array(5).fill(''));

    const handleSave = () => {
        onSave(texts);
    };
    const handleChange = (e, index) => {
        const newTexts = [...texts];
        newTexts[index] = e.target.value.slice(0, 10);
        setTexts(newTexts);
    };

    return (
        <div>
            <h4>Free Text Configuration</h4>
            {texts.map((text, index) => (
                <div key={index}>
                    <input
                        key={index}
                        type="text"
                        value={text}
                        maxLength={10}
                        onChange={(e) => handleChange(e, index)}
                    />
                    <br/>
                </div>
            ))}
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default FreeTextConfiguration;
