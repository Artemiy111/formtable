#!/bin/bash

export CONTAINERD_ADDRESS=/run/k3s/containerd/containerd.sock
nerdctl build -f Dockerfile.nginx -t formtable-nginx:latest .
