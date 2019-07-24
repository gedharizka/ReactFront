import React from 'react';

class  Create extends React.Component{
    constructor(props){
        super(props);
        this.setState({
            item: this.props.item,
            hidden: this.props.hidden
        })
    }

    render(){
        const { hidden, item:{ name, initial, description,active}, handleChange, handleChangeCheckBox, toggleSaveCancel, handleSubmit} = this.props;
        return(
            <div hidden={hidden}>
                <table>
                    <tbody>
                    <tr>
                        <td> Name</td><td><input type="input" value={name} onChange={handleChange('name')}/></td>
                    </tr>
                    <tr>
                        <td> Initial</td><td><input type="input" value={initial} onChange={handleChange('initial')}/></td>
                    </tr>
                    <tr>
                        <td> Description</td><td><input type="input" value={description} onChange={handleChange('description')}/></td>
                    </tr>
                    <tr>
                        <td> Active</td><td><input type="checkbox" checked={active} onChange={handleChangeCheckBox('active')}/></td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" onClick={handleSubmit} >Save</button>
                        </td>
                        <td>
                            <button type="button" onClick={toggleSaveCancel}>Cancel</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}
export default Create;