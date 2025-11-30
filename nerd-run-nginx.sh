#!/bin/bash

export CONTAINERD_ADDRESS=/run/k3s/containerd/containerd.sock
nerdctl run --privileged -p 3000:80 formtable-nginx:latest
