import React from 'react';

class Tambah extends React.Component {
    constructor(props) {
        super(props);
        this.setState({
            item: this.props.item,
            hi: this.props.hi
        })
    }

    render() {
        const { hi, item: { FirstName, LastName, Age, Salary, active }, handleChange, handleChangeCheckBox, toggleSaveCancel, handleSubmit } = this.props;
        return (
      
                <tr hidden={hi}>
                    <td><input type="input" value={FirstName} onChange={handleChange('FirstName')} /></td>
                    <td><input type="input" value={LastName} onChange={handleChange('LastName')} /></td>
                    <td><input type="input" value={Age} onChange={handleChange('Age')} /></td>
                    <td><input type="input" value={Salary} onChange={handleChange('Salary')} /></td>
                    <td><input type="checkbox" checked={active} onChange={handleChangeCheckBox('active')} /></td>                    <td>
                        <button type="button" onClick={handleSubmit} >Save</button>
                    
                        <button type="button" onClick={toggleSaveCancel}>Cancel</button>
                    </td>
                </tr>
            
        )
    }
}
export default Tambah;