import React, { useContext } from 'react';
import { FaWindowClose } from 'react-icons/fa';
import { UserContext } from '../context/user';

export default function Alert() {
    const { alert, hideAlert } = useContext(UserContext);

    let style = 'alert-container';

    if (alert.show) {
        style += ' alert-show';
        if (alert.type === 'danger') {
            style += ' alert-danger';
        }
    }

    return (
        <div className={style}>
            <div className="alert">
                <p>{alert.show && alert.msg}</p>
                <button className="alert-close" onClick={hideAlert}>
                    <FaWindowClose className="" />
                </button>
            </div>
        </div>
    );
}
