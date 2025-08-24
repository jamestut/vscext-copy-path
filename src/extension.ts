// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	// Tab: Copy file name
	context.subscriptions.push(vscode.commands.registerCommand('copy-path-tools.copyFileNameTab', (uri: vscode.Uri) => {
		if (uri) {
			vscode.env.clipboard.writeText(path.basename(uri.fsPath));
		}
	}));

	// Tab: Copy file name without extension
	context.subscriptions.push(vscode.commands.registerCommand('copy-path-tools.copyFileNameNoExtTab', (uri: vscode.Uri) => {
		if (uri) {
			const base = path.basename(uri.fsPath, path.extname(uri.fsPath));
			vscode.env.clipboard.writeText(base);
		}
	}));

	// Editor: Copy file name with line number
	context.subscriptions.push(vscode.commands.registerCommand('copy-path-tools.copyFileNameLineEditor', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const fileName = path.basename(editor.document.fileName);
			const line = editor.selection.start.line + 1;
			vscode.env.clipboard.writeText(`${fileName}:${line}`);
		}
	}));

	// Editor: Copy relative path with line number
	context.subscriptions.push(vscode.commands.registerCommand('copy-path-tools.copyRelativePathLineEditor', () => {
		const editor = vscode.window.activeTextEditor;
		const wsFolder = vscode.workspace.getWorkspaceFolder(editor?.document.uri!);
		if (editor && wsFolder) {
			const relPath = path.relative(wsFolder.uri.fsPath, editor.document.fileName);
			const line = editor.selection.start.line + 1;
			vscode.env.clipboard.writeText(`${relPath}:${line}`);
		}
	}));

	// Editor: Copy full path with line number
	context.subscriptions.push(vscode.commands.registerCommand('copy-path-tools.copyFullPathLineEditor', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const fullPath = editor.document.fileName;
			const line = editor.selection.start.line + 1;
			vscode.env.clipboard.writeText(`${fullPath}:${line}`);
		}
	}));
}

// This method is called when your extension is deactivated
export function deactivate() {}
