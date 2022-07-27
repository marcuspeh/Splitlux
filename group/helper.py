class GroupHelper:
    @staticmethod
    def insertInOrder(lst, element, key=lambda x: x):
        start = 0
        end = len(lst)

        while start < end:
            mid = start + (end - start) // 2

            if key(lst[mid]) <= key(element):
                start = mid + 1
            else:
                end = mid

        lst.insert(start, element)
