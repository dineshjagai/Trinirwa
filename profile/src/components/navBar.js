import React, { Component } from 'react';

function NavBar() {
    return (
        <nav class="navbar navbar-light bg-light">
            <div class="container-fluid">
                <form class="d-flex">
                <a class="navbar-brand" href="#">
      <img src="/profile/src/goku.jpeg" alt="" width="30" height="24" class="d-inline-block align-text-top"></img>
      Bootstrap
    </a>
                    <input class="form-control m-2" type="search"></input>
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
}
export default NavBar;