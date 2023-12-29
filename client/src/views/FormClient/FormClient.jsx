import React from 'react'

function FormClient() {
    return (
        <div>
            <div class="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                <label for="floatingInput">Full Name</label>
            </div>
            <div className="form-floating">
                <input type="text" className="form-control" id="floatingPassword" placeholder="Password" />
                <label for="floatingPassword">Number</label>
            </div>
            <div class="col-md">
                <div class="form-floating">
                    <select class="form-select" id="floatingSelectGrid">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                    <label for="floatingSelectGrid">Works with selects</label>
                </div>
            </div>

        </div>
    )
}

export default FormClient