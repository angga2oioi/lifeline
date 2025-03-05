# Lifeline

Lifeline is a Node.js library designed to send regular heartbeat signals and event notifications to a monitoring server, facilitating the monitoring and health-check of services.

## Features

- **Heartbeat Functionality**: Helps to keep track of active service instances by sending regular heartbeat signals.
- **Event Notification**: Allows sending custom event notifications to the monitoring server.
- **UUID Generation**: Generates and stores unique instance IDs for service instances.
- **Configurable Logs**: Optionally logs success or error messages based on configuration.

## Installation

To install the library, use npm:

```bash
npm i github:angga2oioi/lifeline
```

## Usage

### Import the Library

To start using Lifeline, require the `useLifeline` hook:

```javascript
const { useLifeline } = require("lifeline");
```

### Configuration

You need to pass configuration parameters which include credentials and options:

```javascript
const params = {
  baseUrl: 'https://your-monitoring-server.com',
  secretKey: 'your-secret-key',
  projectId: 'your-project-id',
  serviceId: 'your-service-id',
  instanceId:'your-instance-id',
  instanceFilePath: './path/to/store/instance_id', // optional, if instance Id is not present, the script will generate a random one and store it here for persistence
  interval: 5000, // interval in milliseconds for sending heartbeats
  options: {
    successLog: true, // log success events
    errorLog: true, // log error events
  }
};
```

### Heartbeat

To start sending heartbeat signals:

```javascript
const lifeline = useLifeline(params);
lifeline.startHeartbeat();
```

### Sending Events

To send a custom event notification:

```javascript
lifeline.sendEvent({
  title: 'Event Title',
  message: 'Detailed message about the event'
});
```

## Files Overview

- **index.js**: Exports the `useLifeline` hook for other modules.
- **hooks/useLifeline.js**: Defines and exports the `useLifeline` function that provides heartbeat and event functions.
- **service/api.js**: Handles API requests to the monitoring server, includes sending heartbeats and events.
- **service/heartbeat.js**: Manages the timing and execution of heartbeat signals.
- **service/helper.js**: Contains utility functions for converting numbers and object values.
- **service/instance.js**: Manages unique instance ID generation and persistence.

## Dependencies

Lifeline uses external libraries:

- **axios:** For making HTTP requests.
- **uuid:** For generating unique instance IDs.

## License

This project is licensed under the ISC License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/angga2oioi/lifeline).

## Author

Created by angga2oioi.

## Contact

For any issues or inquiries, please visit the [issue tracker](https://github.com/angga2oioi/lifeline/issues).