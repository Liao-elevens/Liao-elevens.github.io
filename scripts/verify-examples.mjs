import { mkdtempSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, resolve } from 'node:path'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const buildDirectory = mkdtempSync(join(tmpdir(), 'liao-algorithm-examples-'))

function run(label, command, argumentsList) {
  const result = spawnSync(command, argumentsList, {
    cwd: projectRoot,
    encoding: 'utf8'
  })

  if (result.error?.code === 'ENOENT') {
    console.log(`跳过 ${label}：当前环境没有 ${command}`)
    return
  }

  if (result.status !== 0) {
    console.error(`${label} 验证失败`)
    console.error(result.stderr || result.stdout)
    process.exit(1)
  }

  console.log(`${label} 验证通过`)
}

function isAvailable(command, argumentsList) {
  const result = spawnSync(command, argumentsList, {
    cwd: projectRoot,
    encoding: 'utf8'
  })
  return !result.error && result.status === 0
}

run('Python 示例', 'python3', ['examples/python/binary_search.py'])
run('JavaScript 示例', 'node', ['examples/javascript/binary-search.mjs'])

if (isAvailable('javac', ['-version']) && isAvailable('java', ['-version'])) {
  run('Java 编译', 'javac', [
    '-d',
    buildDirectory,
    'examples/java/BinarySearch.java'
  ])
  run('Java 示例', 'java', ['-cp', buildDirectory, 'BinarySearch'])
} else {
  console.log('跳过 Java 示例：当前环境没有可用的 Java 运行环境')
}

if (isAvailable('g++', ['--version'])) {
  const cppOutput = join(buildDirectory, 'binary-search')
  run('C++ 编译', 'g++', [
    '-std=c++17',
    '-Wall',
    '-Wextra',
    '-Werror',
    'examples/cpp/binary_search.cpp',
    '-o',
    cppOutput
  ])
  run('C++ 示例', cppOutput, [])
} else {
  console.log('跳过 C++ 示例：当前环境没有可用的 g++ 编译器')
}

if (isAvailable('go', ['version'])) {
  run('Go 示例', 'go', ['run', 'examples/go/binary_search.go'])
} else {
  console.log('跳过 Go 示例：当前环境没有可用的 Go 运行环境')
}
