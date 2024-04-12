import React, {Component} from 'react';
import './MyApp.css';
import { toast, ToastContainer } from 'react-toastify';


type State = {
    allPagesChecked: boolean;
    pageCheckboxes: boolean[];
};

export default class MyApp extends Component<{}, State> {
    // Initialize state with the 'All pages' checkbox and individual page checkboxes.
    state: State = {
        allPagesChecked: false,
        pageCheckboxes: new Array(4).fill(false),
    };

    // Handler for the 'All pages' checkbox. It will set the state for all checkboxes based on its value.
    handleAllPagesChange = () => {
        const {allPagesChecked} = this.state;
        this.setState({
            allPagesChecked: !allPagesChecked,
            pageCheckboxes: this.state.pageCheckboxes.map(() => !allPagesChecked),
        });
        toast(allPagesChecked ? 'All pages unchecked!' : 'All pages checked!');

    };

    // Handler for individual page checkboxes. It toggles the state for the selected checkbox.
    handlePageChange = (index: number) => {
        const updatedPageCheckboxes = [...this.state.pageCheckboxes];
        updatedPageCheckboxes[index] = !updatedPageCheckboxes[index];

        // If not all page checkboxes are checked, 'All pages' should be unchecked.
        const allPagesChecked = updatedPageCheckboxes.every(Boolean);
        this.setState({
            pageCheckboxes: updatedPageCheckboxes,
            allPagesChecked,
        });

        toast(`Page ${index + 1} is ${updatedPageCheckboxes[index] ? 'checked' : 'unchecked'}!`);
    };

    handleDonePressed = () => {
        toast(`Done pressed!`);
    }

    render() {
        const {allPagesChecked, pageCheckboxes} = this.state;
        return (
            <div className={"app-container"}>
                <div className={"checkbox-section"}>

                    {/* Header section for 'All pages' checkbox */}
                    <div className={"header-section"}>
                        <label className={"label-container"}>
                            <span>All pages</span>
                            <input type="checkbox" checked={allPagesChecked} onChange={this.handleAllPagesChange}/>
                        </label>
                    </div>


                    {/* List of pages checkboxes */}
                    <div className={"page-list-section"}>
                        <ul className={"page-list"}>
                            {pageCheckboxes.map((checked, index) => (
                                <li key={index} className={"page-list-item"}>
                                    <label className={"label-container"}>
                                        <span>{`Page ${index + 1}`}</span>
                                        <input type="checkbox" checked={checked} onChange={() => this.handlePageChange(index)}/>
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* 'Done' button */}
                    <button className={"button-done"} onClick={this.handleDonePressed}>
                        Done
                    </button>
                </div>

                <ToastContainer position="bottom-center" />
            </div>
        );
    }
}
