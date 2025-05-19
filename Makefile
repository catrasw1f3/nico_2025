# Configuration, override port with usage: make PORT=4200
PORT ?= 4100
REPO_NAME ?= Nico_2025
LOG_FILE = /tmp/jekyll$(PORT).log

SHELL = /bin/bash -c
.SHELLFLAGS = -e # Exceptions will stop make, works on MacOS

# Phony Targets
.PHONY: default server issues convert clean stop

# List all .ipynb files in the _notebooks directory
NOTEBOOK_FILES := $(shell find _notebooks -name '*.ipynb')

# Target directory for converted Markdown
DESTINATION_DIRECTORY = _posts
MARKDOWN_FILES := $(patsubst _notebooks/%.ipynb,$(DESTINATION_DIRECTORY)/%_IPYNB_2_.md,$(NOTEBOOK_FILES))

# Main target: start server and monitor logs for changes
default: server
	@echo "Terminal logging starting, watching server..."
	@(tail -f $(LOG_FILE) | awk '\
		/Server address: http:\/\/127.0.0.1:$(PORT)\/$(REPO_NAME)\// { serverReady=1 } \
		serverReady && /^ *Regenerating:/ { regenerate=1 } \
		regenerate { \
			if (/^[[:blank:]]*$$/) { regenerate=0 } \
			else { \
				print; \
				if ($$0 ~ /_notebooks\/.*\.ipynb/) { system("$(MAKE) convert &") } \
			} \
		} \
	') 2>/dev/null &

	@# Wait for server startup or timeout
	@for ((COUNTER = 0; ; COUNTER++)); do \
		if grep -q "Server address:" $(LOG_FILE); then \
			echo "Server started in $$COUNTER seconds"; \
			break; \
		fi; \
		if [ $$COUNTER -eq 60 ]; then \
			echo "Server timed out after $$COUNTER seconds."; \
			echo "Review errors from $(LOG_FILE)."; \
			cat $(LOG_FILE); \
			exit 1; \
		fi; \
		sleep 1; \
	done

	@# Clean log output for background usage
	@sed '$$d' $(LOG_FILE)

# Start local server
server: stop convert
	@echo "Starting server..."
	@nohup bundle exec jekyll serve -H 127.0.0.1 -P $(PORT) > $(LOG_FILE) 2>&1 & \
		PID=$$!; \
		echo "Server PID: $$PID"
	@until [ -f $(LOG_FILE) ]; do sleep 1; done

# Convert .ipynb files to Markdown
convert: $(MARKDOWN_FILES)

$(DESTINATION_DIRECTORY)/%_IPYNB_2_.md: _notebooks/%.ipynb
	@echo "Converting source $< to destination $@"
	@mkdir -p $(@D)
	@python3 -c 'import sys; from scripts.convert_notebooks import convert_single_notebook; convert_single_notebook(sys.argv[1])' "$<"

# Clean up generated files
clean: stop
	@echo "Cleaning converted IPYNB files..."
	@find _posts -type f -name '*_IPYNB_2_.md' -exec rm {} +
	@echo "Cleaning Github Issue files..."
	@find _posts -type f -name '*_GithubIssue_.md' -exec rm {} +
	@echo "Removing empty directories in _posts..."
	@while [ $$(find _posts -type d -empty | wc -l) -gt 0 ]; do \
		find _posts -type d -empty -exec rmdir {} +; \
	done
	@echo "Removing _site directory..."
	@rm -rf _site

# Stop any running server and logging processes
stop:
	@echo "Stopping server..."
	@lsof -ti :$(PORT) | xargs kill >/dev/null 2>&1 || true
	@echo "Stopping logging process..."
	@ps aux | awk -v log_file=$(LOG_FILE) '$$0 ~ "tail -f " log_file { print $$2 }' | xargs kill >/dev/null 2>&1 || true
	@rm -f $(LOG_FILE)
