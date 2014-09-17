package no.extreme.randopedia.controller;

import java.io.IOException;

import no.extreme.randopedia.model.migration.MigrationResult;
import no.extreme.randopedia.service.UpdateTagCloudService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(value = "/admin")
public class UpdateTagCloudController {

    @Autowired
    UpdateTagCloudService updateTagCloudService;

    @RequestMapping(method = RequestMethod.GET, value = "/updateTagCloud", produces = "application/json")
    public @ResponseBody MigrationResult updateTagCloud() throws IOException {

        updateTagCloudService.updateTagCloud();
        
        return null;
    }
}
