#!/bin/bash

# Save this as restart_node.sh
while true; do
    echo "Starting Node.js application..."
    node /path/to/your/app.js
    echo "Application crashed or stopped. Restarting in 5 seconds..."
    sleep 5
done
