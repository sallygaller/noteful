import React from 'react'
import { NavLink } from 'react-router-dom';
import StoreContext from './StoreContext';

class AllFolders extends React.Component {

    static contextType = StoreContext;

    render() {
        const { folders=[] } = this.context
        return (
            <div>
                <ul>
                    {folders.map(folder =>
                        <NavLink to={`/folder/${folder.id}`}>
                            <li key={folder.id}>
                                <h3>{folder.name}</h3>
                            </li>
                        </NavLink>
                    )}
                </ul>
            </div>
        )
    }
}

export default AllFolders
