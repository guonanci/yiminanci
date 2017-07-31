#git hooks

Hooks are programs you can place in a hooks directory to trigger actions at certain points in git’s execution. Hooks that don’t have the executable bit set are ignored.

By default the hooks directory is $GIT_DIR/hooks, but that can be changed via the core.hooksPath configuration variable (see git-config[1]).

Before Git invokes a hook, it changes its working directory to either $GIT_DIR in a bare repository or the root of the working tree in a non-bare repository. An exception are hooks triggered during a push (pre-receive, update, post-receive, post-update, push-to-checkout) which are always executed in $GIT_DIR.
