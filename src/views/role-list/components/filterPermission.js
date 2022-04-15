export function filterPermission(rolePermission) {
  const permissionObj =
    {
      menus: [
        {
          id: '1',
          permissionName: '员工管理',
          permissionMark: 'userManage'

        },
        {
          id: '2',
          permissionName: '角色列表',
          permissionMark: 'roleList'
        },
        {
          id: '3',
          permissionName: '权限列表',
          permissionMark: 'permissionList'
        },
        {
          id: '4',
          permissionName: '文章排名',
          permissionMark: 'articleRanking'
        },
        {
          id: '5',
          permissionName: '创建文章',
          permissionMark: 'articleCreate'
        }
      ],
      points: [
        {
          id: '1-1',
          permissionName: '分配角色',
          permissionMark: 'distributeRole'
        },
        {
          id: '1-2',
          permissionName: '导入员工',
          permissionMark: 'importUser'
        },
        {
          id: '1-3',
          permissionName: '删除员工',
          permissionMark: 'removeUser'
        },
        {
          id: '2-1',
          permissionName: '分配权限',
          permissionMark: 'distributePermission'
        }
      ]
    }
  const arr = []
  rolePermission.menus.forEach((item) => {
    permissionObj.menus.forEach((item2) => {
      if (item === item2.permissionMark) {
        arr.push(item2.id)
      }
    })
  })
  rolePermission.points.forEach((item) => {
    permissionObj.points.forEach((item2) => {
      if (item === item2.permissionMark) {
        arr.push(item2.id)
      }
    })
  })
  console.log(arr)
  return arr
}
