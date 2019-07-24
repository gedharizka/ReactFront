import React from 'react';

class Create extends React.Component {

    render() {
        const { catagori: { name, initial, active }, handleChange, handleCheckBox, } = this.props;
        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2"> Name </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={name} onChange={handleChange('name')} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2"> Initial </label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control" value={initial} onChange={handleChange('initial')} />
                        </div>
                    </div>
                </div>
                <div className="form-check">
                    <div className="row">
                        <label className="form-check-label col-sm-2"> Active </label>
                        <div className="col-sm-10">
                            <input type="checkbox" className="form-check-input" checked={active} onChange={handleCheckBox('active')} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Create;