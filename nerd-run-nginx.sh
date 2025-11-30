#!/bin/bash

export CONTAINERD_ADDRESS=/run/k3s/containerd/containerd.sock
nerdctlk run --privileged -p 3000:80 formtable-nginx:latest
