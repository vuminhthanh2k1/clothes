watch:
	tsc-watch --onSuccess "node server/server.js"

watch-debug:
	tsc-watch --onSuccess "node --inspect-brk server/server.js"

codegen: codegen-fetch

codegen-export:
	# def
	lb export-api-def -o codegen/def.yaml
	cd codegen && \
		patch < def.patch

codegen-fetch: codegen-export
	# fetch
	cd codegen && \
		java -jar swagger-codegen-cli-2.2.3.jar generate -i def.yaml -l typescript-fetch -o api/fetch
	sed -i~ -e 's/XAny/any/g' codegen/api/fetch/api.ts
	find codegen/api/fetch -not -name api.ts -delete || true
