import React, { Component } from 'react';
import { SketchPicker } from 'react-color';

import {returnFolders, returnTheme} from '../../actions/storageActions'

class QuickLinkEdit extends Component {
    render() {
        return (
            <div className="edit-item-modal">
                <div className={"new-item-modal-content "+ returnTheme() + "-t-modal"}>
                    <div className="modal-w">
                        {this.modalColors()}
                        <h1 className={"head-w "+ returnTheme() + "-t-text-w"}>Edit Quick Link</h1>

                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="name">Name</label>
                            <div className="input-w">
                                <input onChange={this.handleModalInput} spellCheck="false" autoComplete="off" name="newItemName" className="input-name edit-name-input" placeholder="Example" type="text"/>
                            </div>
                        </div>
                        
                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="url">URL</label>
                            <div className="input-w">
                                <input onChange={this.handleModalInput} spellCheck="false" autoComplete="off" name="newItemURL" className="input-url edit-url-input" placeholder="http://www.example.com" type="text"/>
                            </div>
                        </div>

                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="folder">Folder</label>
                            <div className="input-w">
                                <select onChange={this.handleModalInput} name="newItemFolder" className="input-folder edit-folder-input select-w">
                                    <option name='default' value='default'>Main</option>
                                    {this.drawFolderOptions()}
                                </select>
                            </div>
                        </div>

                        <div className="field-w">
                            <label className={"label-w "+ returnTheme() + "-t-text-w"} htmlFor="colors">Color</label>

                            <div className="input-w">
                                <input onFocus={this.showColors} onChange={this.handleModalInput} spellCheck="false" autoComplete="off" name="newItemColor" className="input-colors edit-colors-input" placeholder="#E32018" value={this.state.color} type="text"/>
                            </div>
                        </div>
                    </div>
                    <div className="btn-container-w">
                        <div onClick={this.removeItem} className={"btn-w "+ returnTheme() + "-t-btn-w"}>Remove Link</div>
                        <div onClick={this.handleItem} className={"btn-w "+ returnTheme() + "-t-btn-w"}>Edit Link</div>
                    </div>
                </div>
            </div>
        );
    }

    state = {
    
    }

    modalColors = () => <SketchPicker className={returnTheme() + '-t-modal'} color='#fff' onChangeComplete = { this.handleColor }/>

    showColors = () => { document.querySelector('.sketch-picker').style.display = 'block' }

    handleColor = (color) => document.querySelector('.input-colors').value = color.hex

    handleModalInput = (e) => this.setState({[e.target.name]: e.target.value})

    drawFolderOptions = () => returnFolders().map(folder => <option name={folder.id} key={folder.id} value={folder.id}>{folder.name}</option>)

    handleItem = () => {
        var nameInput = document.querySelector(".edit-name-input").value
        var urlInput = document.querySelector(".edit-url-input").value
        var folderInput = document.querySelector(".edit-folder-input").value
        var modal = document.querySelector(".edit-item-modal")
        var picker = document.querySelector('.sketch-picker')
        var colorInput = document.querySelector(".edit-colors-input")
        var color = colorInput.value;

        //Parse http
        if(!urlInput.includes('http')){
            urlInput = 'http://' + urlInput
        }

        //Hide modal
        modal.classList.remove('modal-active')
        picker.style.display = 'none'

        //Update State
        this.props.updateLinksState()

        this.setState({
            ...this.state,
            colorSelected: ''
        })

        var obj = {
            name: nameInput,
            url: urlInput,
            folder: folderInput,
            color: color,
            id: this.props.data.id 
        }

        // eslint-disable-next-line
        window.localStorage.setItem(this.props.data.id, JSON.stringify(obj))
    }

    removeItem = () => {
        var modal = document.querySelector(".edit-item-modal")
        var picker = document.querySelector('.sketch-picker')
        
        window.localStorage.removeItem(this.props.data.id)

        this.props.updateLinksState()

        modal.classList.remove('modal-active')
        picker.style.display = 'none'
    }
}

export default QuickLinkEdit;