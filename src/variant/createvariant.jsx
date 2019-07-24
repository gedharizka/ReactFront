import React from 'react';

class Create extends React.Component {
    render() {
        const { variant: { name, initial,  categoryId,  active}, handleChange, handleCheckBox, readOnly, catagories } = this.props;
        return (
            <div className="form-horizontal">
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2">Category:</label>
                        <div className="col-sm-10">
                            <select className="form-control" value={categoryId} onChange={handleChange('categoryId')} disabled={readOnly}>
                                <option value=''>Select Category</option>
                                {catagories.map(c => {
                                    return (
                                        <option value={c._id}>{c.name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2"> Name </label>
                        <div className="col-sm-10">
                            <input type="text" readOnly={readOnly} className="form-control" value={name} onChange={handleChange('name')} />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="row">
                        <label className="control-label col-sm-2"> Initial </label>
                        <div className="col-sm-10">
                            <input type="text" readOnly={readOnly} className="form-control" value={initial} onChange={handleChange('initial')} />
                        </div>
                    </div>
                </div>
                <div className="form-check">
                    <div className="row">
                        <label className="form-check-label col-sm-2"> Active </label>
                        <div className="col-sm-10">
                            <input type="checkbox" disabled={readOnly} className="form-check-input" checked={active} onChange={handleCheckBox('active')} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}
export default Create;