import React from "react";

class Sample extends React.Component{
    values = {
        Alamat: " ",
        Domisili: " "
    }
    constructor(props) {
        super(props);
        this.state = {
            values: this.values
        }
    }
    handlerChange = name => ({ target: { value } }) => {
        this.setState({
            values: {
                ...this.state.values,
                [name]: value
            }
        });
    }
    render (){
        const { Alamat, Domisili} = this.state.values;
        return (
            <div align="center">
              <h4>Alamat</h4>
              <table border="1">
                <td>
                    Alamat  : <input type="text" value={Alamat} onChange={this.handlerChange('Alamat')} />
                </td>
                <td>
                    Domisili : <input type="text" value={Domisili} onChange={this.handlerChange('Domisili')} />
                </td>
            
                <tr>
                    <td>Alamat </td>
                    <td>: {Alamat}</td>
                </tr>
                <tr>
                    <td>Domisili </td>
                    <td>:{Domisili}</td>
                </tr>

            </table>
  
            </div>
        )
    }

}
export default Sample;