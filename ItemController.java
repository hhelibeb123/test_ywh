package com.ywh.controller;


import com.github.pagehelper.PageInfo;
import com.ywh.domain.Item;
import com.ywh.service.ItemService;
import com.ywh.vo.ItemVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/webItem")
public class ItemController {

    @Autowired
    ItemService itemService;

    @RequestMapping(value = "/findAllItem", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> findAllItem(ItemVo itemVo) {
        Map<String, Object> map = new HashMap<>();
        List<Item> itemList = itemService.findAllItem(itemVo);
        PageInfo pageInfo = new PageInfo(itemList);
        long count = pageInfo.getTotal();
        int pagenum = pageInfo.getPageNum();
        int size = pageInfo.getSize();
        map.put("count", count);
        map.put("pagenum", pagenum);
        map.put("size", size);
        map.put("list", itemList);
        return map;

    }

    @RequestMapping(value = "/addItem", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> addItem(@RequestBody Item item) {
        Map<String, Object> map = new HashMap<>();
        Integer stauts1 = itemService.addItem(item);
        if (stauts1 == 1) {
            map.put("code", 101);
        } else {
            map.put("code", 102);
        }
        return map;

    }

    @RequestMapping(value = "/updateItem", method = RequestMethod.POST)
    public @ResponseBody
    Map<String, Object> updateItem(@RequestBody Item item) {
        Map<String, Object> map = new HashMap<>();
        Integer status1 = itemService.updateItem(item);
        if (status1 != 0) {
            map.put("code", 101);
        } else {
            map.put("code", 102);
        }
        return map;
       }



    @RequestMapping(value = "/deleteItem", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> deleteItem(String itemid) {
        Map<String, Object> map = new HashMap<>();
        Integer status = itemService.deleteItem(itemid);
        if (status != 0) {
            map.put("code", 101);
        } else {
            map.put("code", 102);
        }
        return map;

    }

    @RequestMapping(value = "/findeItemById", method = RequestMethod.GET)
    public @ResponseBody
    Map<String, Object> findItemById(String itemid) {
        Map<String, Object> map = new HashMap<>();
        Item item = itemService.findItemById(itemid);
        map.put("item11", item);
        return map;

       }


    }


