import './keyboard.scss';
import React from 'react';

type KeyboardProps = {
    onClick?: (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
    selectedKeys: Record<string, boolean>
}

export const Keyboard = ({ onClick, selectedKeys }: KeyboardProps) => {
    const keys = ['c1', 'cs1', 'd1', 'ds1', 'e1', 'f1', 'fs1', 'g1', 'gs1', 'a1', 'as1', 'b1', 'c2', 'cs2', 'd2', 'ds2', 'e2', 'f2', 'fs2', 'g2', 'gs2', 'a2', 'as2', 'b2'];
    return (
        <React.Fragment>
            <div className="keyboard">
                <ul>
                    {keys.map(key => (
                        <li
                            key={key}
                            className={`key ${key.includes('s') ? 'black' : 'white'} ${selectedKeys[key] ? 'selected' : ''}`}
                            onClick={onClick}
                            id={key}
                        />
                    ))}
                </ul>
            </div>
        </React.Fragment>
    )
}
