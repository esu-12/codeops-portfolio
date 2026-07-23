"""
Day 09 Practice
Trees, Graphs, and Heaps
"""

from collections import deque
import heapq

# =====================================================
# Exercise 1: Binary Search Tree
# =====================================================

class Node:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None


def insert(root, value):
    """Insert a value into the BST."""
    if root is None:
        return Node(value)

    if value < root.value:
        root.left = insert(root.left, value)
    else:
        root.right = insert(root.right, value)

    return root


def inorder(root):
    """In-order traversal (Left, Root, Right)."""
    if root:
        inorder(root.left)
        print(root.value, end=" ")
        inorder(root.right)


print("=" * 50)
print("Exercise 1: Binary Search Tree")

balances = [500, 250, 700, 100, 300, 600, 900, 450]

root = None
for balance in balances:
    root = insert(root, balance)

print("In-order traversal:")
inorder(root)
print("\n")


# =====================================================
# Exercise 2: Tree Height
# =====================================================

def height(node):
    """Return the height (depth) of a binary tree."""
    if node is None:
        return 0

    left_height = height(node.left)
    right_height = height(node.right)

    return 1 + max(left_height, right_height)


print("=" * 50)
print("Exercise 2: Tree Height")
print("Tree height:", height(root))
print()


# =====================================================
# Exercise 3: Breadth-First Search (BFS)
# =====================================================

graph = {
    "A": ["B", "C"],
    "B": ["D", "E"],
    "C": ["F"],
    "D": [],
    "E": ["F"],
    "F": []
}


def bfs(graph, start):
    """Return all reachable vertices using BFS."""
    visited = set()
    queue = deque([start])

    while queue:
        vertex = queue.popleft()

        if vertex not in visited:
            visited.add(vertex)

            for neighbor in graph[vertex]:
                if neighbor not in visited:
                    queue.append(neighbor)

    return visited


print("=" * 50)
print("Exercise 3: BFS")

reachable = bfs(graph, "A")
print("Reachable:", reachable)
print()


# =====================================================
# Exercise 4: Depth-First Search (DFS)
# =====================================================

def dfs(graph, start, visited=None):
    """Recursive DFS."""
    if visited is None:
        visited = set()

    visited.add(start)

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)

    return visited


print("=" * 50)
print("Exercise 4: DFS")

visited = dfs(graph, "A")
print("Reachable:", visited)
print()

print("BFS explores level by level.")
print("DFS explores as deep as possible before backtracking.")
print()


# =====================================================
# Exercise 5: Priority Queue (Heap)
# =====================================================

print("=" * 50)
print("Exercise 5: Priority Queue")

tasks = []

heapq.heappush(tasks, (3, "Backup database"))
heapq.heappush(tasks, (1, "Handle emergency"))
heapq.heappush(tasks, (5, "Clean logs"))
heapq.heappush(tasks, (2, "Process transactions"))
heapq.heappush(tasks, (4, "Generate report"))

print("Tasks in priority order:")

while tasks:
    priority, task = heapq.heappop(tasks)
    print(f"Priority {priority}: {task}")