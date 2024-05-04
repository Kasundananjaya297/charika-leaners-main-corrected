import React from 'react';
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';

class SchedulerSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // Initialize state if needed
        };

        // Bind event handlers if needed
        this.commitChanges = this.commitChanges.bind(this);
        this.handleSelectionChange = this.handleSelectionChange.bind(this);
    }

    // Define event handlers and other methods

    render() {
        const { appointments } = this.props; // Assuming appointments are passed as props

        return (
            <AppointmentForm
                appointments={appointments} // Pass appointments as a prop to AppointmentForm
                onCommitChanges={this.commitChanges} // Assuming you want to handle changes in the parent component
                // Add other props as needed
            />
        );
    }
}

export default SchedulerSelector;
