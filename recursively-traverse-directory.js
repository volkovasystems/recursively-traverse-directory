/*:
	@module-license:
		The MIT License (MIT)

		Copyright (c) 2014 Richeve Siodina Bebedor

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license

	@module-configuration:
		{
			"packageName": "recursively-traverse-directory",
			"fileName": "recursively-traverse-directory.js",
			"moduleName": "recursivelyTraverseDirectory",
			"authorName": "Richeve S. Bebedor",
			"authorEMail": "richeve.bebedor@gmail.com",
			"repository": "git@github.com:volkovasystems/recursively-traverse-directory.git"
		}
	@end-module-configuration

	@module-documentation:

	@end-module-documentation

	@include:
		{
			"append-list@github.com/volkovasystems": "appendList",
			"traverse-directory@github.com/volkovasystems": "traverseDirectory",
			"check-directory-exists@github.com/volkovasystems": "checkDirectoryExists",
			"fs@nodejs": "fs",
			"path@nodejs": "path"
		}
	@end-include
*/

var recursivelyTraverseDirectory = function recursivelyTraverseDirectory( domainDirectory ){
	/*:
		@meta-configuration:
			{
				"domainDirectory:required": "string"
			}
		@end-meta-configuration
	*/
	
	var filePathList = [ ];
	var directoryList = [ ];
	var currentDomainDirectory = domainDirectory;

	while(
		appendList( filePathList, 
			traverseDirectory( currentDomainDirectory )
				.map( function onEachFilePath( filePath ){
					if( checkDirectoryExists( filePath ) ){
						directoryList.push( path.resolve( ".", currentDomainDirectory, filePath ) );
					}

					return filePath;
				} ) 
		),
		currentDomainDirectory = directoryList.pop( ),
		directoryList.length > 0
	);

	return filePathList;
};

var appendList = require( "./append-list/append-list.js" );
var traverseDirectory = require( "./traverse-directory/traverse-directory.js" );
var checkDirectoryExists = require( "./check-directory-exists/check-directory-exists.js" );
var fs = require( "fs" );
var path = require( "path" );

module.exports = recursivelyTraverseDirectory;