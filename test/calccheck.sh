#!/usr/bin/env zsh

FILEPATH=$1
FILESIZE=$(ls -nl "$FILEPATH" | awk '{print $5}')

function trim {
	local orig="$1"
	local trmd=""
	while true; do
		trmd="${orig#[[:space:]]}"
		trmd="${trmd%[[:space:]]}"
		test "$trmd" = "$orig" && break
		orig="$trmd"
	done
	printf -- '%s\n' "$trmd"
}

function getbyte {
	bytestart=$(($1 + 1))
	byteend=$(($2 + 1))

	string=$(head -c $byteend "${FILEPATH}" | tail -c $(($byteend - ($bytestart - 1))); echo .); string=${string%.}

	n=$(echo -n $string | od -v -An -t u1 | (read -r -d '' i; trim "$i") | sed -e 's/\*//g' | sed 's/[[:space:]][[:space:]]*/,/g' | sed -e "s/ ,/,/g" -e "s/\n//g")

	echo "$n" | sed 's/ //g' | tr -d "\n"
}

BYTES=$(getbyte 9624 13602)
CHECKSUM=255

for byte in $(echo $BYTES | tr "," " "); do
	CHECKSUM=$(subunsigned $CHECKSUM $byte)
done

echo $CHECKSUM
